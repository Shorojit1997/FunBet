import React from 'react';
import { Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import { useSelector, shallowEqual } from 'react-redux';


const Notifications = ({ modal, setModal }) => {
    const toggle = () => setModal(!modal);
    const { notifications } = useSelector(state => state.notifications, shallowEqual);
 


    return (
        <div >
            <Popover placement="bottom" isOpen={modal} target="Popover1" toggle={toggle}>
            <PopoverHeader>Notifications</PopoverHeader>
                <div className='border m-1'>
                    {
                        notifications.length > 0 ?
                            notifications.map(item => {
                                return (
                                    <div key={Math.random()*999847924}>
                                        <PopoverHeader>{item.title}</PopoverHeader>
                                        <PopoverBody>{item.description} </PopoverBody>

                                    </div>
                                )
                            })
                            :
                            <div></div>
                    }
                </div>

            </Popover>
        </div>
    );
}

export default Notifications;