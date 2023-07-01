import { Request, Response, Router } from 'express'
import { FindLinkedContacts, Icontact } from '../contollers/FindLinkedContacts'
import { CreateContact } from '../contollers/CreateContact'
import { getResponse } from '../contollers/getResponse'
import { get } from 'mongoose'
import { getPrimaryContacts } from '../contollers/getPrimaryContacts'
import { UpdateContact } from '../contollers/UpdateContact'

const router = Router()

router.post('/', async (req: Request, res: Response) => {

    const user = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }

    try {
        const ContactByEmailAndPhone = await FindLinkedContacts(user) || []
        const PrimaryContacts = getPrimaryContacts(ContactByEmailAndPhone)
        let isContactListUpdated: Boolean = false
        if (PrimaryContacts?.length > 1) {
            //update contact primary to secondary
            await UpdateContact(PrimaryContacts)
            isContactListUpdated = true
        } else if (ContactByEmailAndPhone?.length === 0) {
            //create new primary contact
            await CreateContact({ ...user, PrimaryContactId: null })
            isContactListUpdated = true
        } else if (ContactByEmailAndPhone?.length > 0) {
            //create new secondary contact
            await CreateContact({ ...user, PrimaryContactId: PrimaryContacts[0]?._id })
            isContactListUpdated = true
        }

        const ContactArray = isContactListUpdated ? await FindLinkedContacts(user) : ContactByEmailAndPhone
        const contact = getResponse([...<[]>ContactArray])
        console.log('respon');
        res.status(200).json({ contact })

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message })
    }



})

export default router



