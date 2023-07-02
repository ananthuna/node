import { Request, Response, Router } from 'express'
import { FindLinkedContacts } from '../contollers/FindLinkedContacts'
import { CreateContact } from '../contollers/CreateContact'
import { getResponse } from '../contollers/getResponse'
import { getPrimaryContacts } from '../contollers/getPrimaryContacts'
import { UpdateContact } from '../contollers/UpdateContact'
import User from '../models/userModel'

const router = Router()

router.post('/', async (req: Request, res: Response) => {

    const user = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }

    try {
        const ContactByEmailAndPhone = await FindLinkedContacts(user) || []
        let PrimaryContacts =await getPrimaryContacts(ContactByEmailAndPhone)
        let isContactListUpdated: Boolean = false
        const isContactExist = ContactByEmailAndPhone.find((item) => item.email === user.email && item.phoneNumber === user.phoneNumber)

        if (PrimaryContacts?.length > 1) {

            await UpdateContact(PrimaryContacts)
            isContactListUpdated = true

        } else if (ContactByEmailAndPhone?.length === 0) {

            const userContact = await CreateContact({ ...user, PrimaryContactId: null })
            if (userContact.linkPrecedence === "primary") PrimaryContacts.push(userContact)
            isContactListUpdated = true

        } else if (ContactByEmailAndPhone?.length > 0 && !isContactExist) {

            await CreateContact({ ...user, PrimaryContactId: PrimaryContacts[0]?._id })
            isContactListUpdated = true
            
        }

        const contact = await getResponse(PrimaryContacts[0])
        res.status(200).json({ contact })

    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message })
    }
})

export default router



