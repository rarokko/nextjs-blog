import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { listUsers } from './api/dynamo_scan'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { User } from '../models/User'
import ApolloClient, { gql } from 'apollo-boost';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { useEffect, useState } from 'react'

export default function Home() {
  
  // const client = new ApolloClient({
  //   uri: 'api/dynamo_get'
  // });

  // function consultausuario(id) {
  
  //   client.query({
  //     query: gql`
  //       {
  //         user(id: "${id}") {
  //           username,
  //           id,
  //           email
  //         }
  //       }
  //     `
  //   })
  //   .then((result) => {
  //       console.log(result.data.user)
  //       setuser(result.data.user)
  //     }
  //   )
  //   .catch((err) => console.log(err))
  // }

  const [inputValue, setInputValue] = useState("");
  const [consultaUsuario, { loading, error, data }] = useLazyQuery(gql`
    {
      user(id: "${inputValue || 1}") {
        username,
        id,
        email
      }
    }
  `);

  if (loading) return <p>Carregando</p>

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <input value={inputValue} placeholder={"Digite o ID do Usuário"} onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={() => consultaUsuario()}>Consultar</button>

        {data && data.user &&
          <>
            <p>{data.user.username}</p>
            <p>{data.user.id}</p>
            <p>{data.user.email}</p>
          </>
        }
      </section>
    </Layout>
  )
}

// export async function getStaticProps() {
//   try {
//     const users: Array<User> = await listUsers();

//     return {
//       props: {
//         users
//       }
//     }

//   } catch (e) {
//     console.log(e);
//   }
// }
