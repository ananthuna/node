import { Request, Response, Router } from 'express'
import { FindLinkedContacts } from '../contollers/FindLinkedContacts'
import User from '../models/userModel'
// import { Icontact } from '../contollers/FindLinkedContacts'
import { CreateContact } from '../contollers/CreateContact'
import { getResponse } from '../contollers/getResponse'
// import { getPrimaryContact } from '../contollers/getPrimaryContact'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);

    const user = {
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    }

    try {
        const ContactByEmailAndPhone = await FindLinkedContacts(user)
        const PrimaryContact = ContactByEmailAndPhone?.find(item => item.linkPrecedence === "primary")
        const isContactExist = ContactByEmailAndPhone?.find(item => item.email === user.email && item.phoneNumber === user.phoneNumber)
        const arg: any = {
            ...user,
            linkedId: PrimaryContact ? PrimaryContact._id : null,
            linkPrecedence: PrimaryContact ? "secondary" : "primary",
            deletedAt: null
        }

        if (!isContactExist) {
            CreateContact(arg)
        }

        const ContactArray = [...await User.find({ linkedId: PrimaryContact?._id }), PrimaryContact]
        const contact = getResponse([...<[]>ContactArray])
        console.log(contact);

        res.status(200).json({ contact })
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message })
    }



})

export default router



