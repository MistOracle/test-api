import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import CustomInput from 'src/Input2'
import { Container, Title } from 'src/styles/styled'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [ regKey,setRegKey ] = useState<string>("");

  const handleUpload = async()=>{
    const url = document.baseURI;

    const res = await fetch("http://localhost:3001/api/updateKey",{
      method:"POST",
      headers:{
        contentType:"application/json"
      },
      body:JSON.stringify({ regKey,url })
    })

    const { result } = await res.json();
    console.log("POSTED_RES",result);

    result.acknowledged && setRegKey("");
  }

  return (
    <Container minH={ 100 } minW="100vw" bgd="black" centralize>
      <Container>
        <Container mv={ 1 } border={ 0.3 } bc="teal" br={ 2 } p={ 1 } bgd="rgba(0,0,0,0.85)" w="calc(150px + 20vw)">
          <CustomInput size="calc(20px + 1.5vw)" border="none" line="none" bgd="none" value={ regKey } setValue={ setRegKey } />
        </Container>
        <Container onClick={ handleUpload } bgd={ regKey.length?"teal":"lightgrey" } w="calc(100px + 15vw)" m="auto" br={ 2 } p={ 1 } button pointer centralize>
          <Title size="calc(15px + 1vw)" color={ regKey.length?"lightgrey":"teal" }>update regKey!</Title>
        </Container>
      </Container>
    </Container>
  )
}
