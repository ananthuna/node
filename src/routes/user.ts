import { Request, Response, Router } from 'express'
import { FindLinkedContacts } from '../contollers/FindLinkedContacts'
import User from '../models/userModel'
import { CreateContact } from '../contollers/CreateContact'
import { getResponse } from '../contollers/getResponse'

const router = Router()

router.post('/', async (req: Request, res: Response) => {
    // console.log(req.body);

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

        const ContactArray = await FindLinkedContacts(user)
        const contact = getResponse([...<[]>ContactArray])
        res.status(200).json({ contact })
    } catch (error: any) {
        console.log(error.message);
        res.status(404).json({ message: error.message })
    }



})

export default router



