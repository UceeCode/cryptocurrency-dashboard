import React from "react";
import WelcomeMessage from './WelcomeMessage';
import ConfirmButton from "./ConfirmButton";
import Page from "../Shared/Page";

export default function App() {
    return (
        <Page name="settings">
            <WelcomeMessage />
            <ConfirmButton />
        </Page>
    );
}