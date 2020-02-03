import React, { useState } from 'react';
import './SendTweet.scss';
import { Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment'
import ModalContainer from '../ModalContainer'
import FormSentTweet from '../FromSendTweet'
import { TWEETS_STORAGE } from '../../utils/contants'

export default function SendTweet(props) {
    const { setToastProps, allTweets } = props;
    const [isOpenModal, setIsOPenModal] = useState(false);
    const openModal = () => {
        setIsOPenModal(true);
    }
    const closeModal = () => {
        setIsOPenModal(false);
    }

    const sendTweet = (event, formValue) => {
        event.preventDefault();
        const { name, tweet } = formValue;
        let allTweetsArray = [];

        if (allTweets) {
            allTweetsArray = allTweets;
        }

        if (!name || !tweet) {
            setToastProps({
                open: true,
                text: "WARNING!: Todos los campos son obligatorios"
            })
        } else {
            formValue.time = moment();
            allTweetsArray.push(formValue);
            localStorage.setItem(TWEETS_STORAGE, JSON.stringify(allTweetsArray))
            setToastProps({
                open: true,
                text: "Tweet enviado correctamente"
            })
            closeModal();
        }
        allTweetsArray = [];
    }

    return (
        <div className="send-tweet">
            <Fab className='send-tweet_open-modal'
                color='primary'
                aria-label='add'
                onClick={openModal}>
                <AddIcon />
            </Fab>

            <ModalContainer isOpenModal={isOpenModal} closeModal={closeModal}>
                <FormSentTweet sendTweet={sendTweet} />
            </ModalContainer>

        </div>
    )
}
