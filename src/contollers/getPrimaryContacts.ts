import { Icontact } from "./FindLinkedContacts";

export const getPrimaryContacts = (array: Icontact[]): Icontact[] => {

    return array.filter(item => item.linkPrecedence === "primary")
}