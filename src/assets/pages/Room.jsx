import React, { useEffect, useState } from 'react';
import client, { databases ,DATABASE_ID,COLLECTION_ID_MESSAGES,PROJECT_ID } from '../../appwriteconfig';
import { ID ,Permission,Role} from 'appwrite';
import {Trash2} from 'react-feather'
import Header from '../../components/Header';
import { userAuth } from '../../utils/Usercontext';
function Room() {
  const [messages,setMessages] = useState([]);
  const {user} = userAuth()
  useEffect(()=>{
    getMessages()
    const subscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
    
    if(response.events.includes("databases.*.collections.*.documents.*.create")){
      
      setMessages(prev=>[response.payload,...prev])
    }
    if(response.events.includes("databases.*.collections.*.documents.*.delete")){
      setMessages(prev=>prev.filter(message=>message.$id!==response.payload.$id))
    }
    })
    return ()=>{
      subscribe()
    }
  },[])
  const [text,setText] = useState('')

  const getMessages = async()=>{
    const resp = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES
    )
    setMessages(resp.documents)
  }

  const permissions = [
    Permission.write(Role.user(user.$id))
  ]

  const handleSubmit = async(e)=>{
    e.preventDefault()
    const resp = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      {
        body:text,
        user_name:user.name,
        user_id:user.$id
      },
      permissions
    )
    console.log('mesg:',resp);
    // setMessages(prev=>[resp,...prev])
    setText('')
  }
  console.log(user.name);
  const deleteMessage = async(messageId)=>{
    let resp = await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      messageId
    )
    
  }
  return (
    <main className='container'>
      <Header/>
      <div className='room--container'>
        <div>
          {
            messages.map((message)=>(
              <div key={message.$id}
              className='message--wrapper'
              >
                <div className='message--header'>
                  <small>
                    {
                      message.user_name
                    }
                  </small>
                  <small className='message-timestamp'>
                    {Date(message.$createdAt).toLocaleString().slice(16,25)}
                  </small>
                  {
                    message.$permissions.includes(`delete(\"user:${user.$id}\")`)?
                    <Trash2
                  className='delete--btn'
                  onClick={()=>{deleteMessage(message.$id)}}
                  ></Trash2> : null
                  }
                  
                </div>
                <div className={'message--body '+(message.user_id===user.$id? 'message--body--owner':'')}>
                  <span>{message.body}</span>
                </div>
              </div>
            ))
          }
        </div>
        <form id='message--form'>
          <div>
            <input type="text"
            value={text}
            onChange={(e)=>setText(e.target.value)}
            maxLength={500}
            placeholder='Type...'
            />
            <button type='submit'
            className='btn btn-secondary'
            onClick={handleSubmit}
            >Send</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Room;
