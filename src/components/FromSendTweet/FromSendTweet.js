import React, { useState } from 'react';
import { FormControl, FormGroup, TextField, Button } from '@material-ui/core';

import './FormSendTweet.scss';

export default function FormSendTweet(props) {
    const { sendTweet } = props;
    const [formValue, setFormValue] = useState({
        name: "",
        tweet: ""
    });

    const onFormChange = event => {
        setFormValue({
            ...formValue,
            [event.target.name]: event.target.value
        });
    };

    return (
        <div className='form-send-tweet'>
            <h2 className='form-send-tweet_title'>Enviar Tweet</h2>
            <form className='form-send-tweet_form'
                onSubmit={event => sendTweet(event, formValue)}
                onChange={onFormChange}>
                <FormControl>
                    <FormGroup>
                        <TextField
                            className='form-send-tweet_form-name'
                            type='text'
                            name="name"
                            placeholder='Nombre de usuario'
                            margin='normal'
                        />
                    </FormGroup>
                    <FormGroup>
                        <TextField
                            className='form-send-tweet_form-textarea'
                            type='tweet'
                            name="tweet"
                            multiline
                            rows='6'
                            placeholder='Escribe su tweet'
                            margin='normal'
                        />

                    </FormGroup>
                    <FormGroup>
                        <Button type='submit'>Enviar Tweet</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>

    )
}