import { Metadata } from "next";
import Form from "./Form";


export const metadata: Metadata = {
    title: 'Profile',
}

export default function ProfilePage() {
    return <Form/>
}