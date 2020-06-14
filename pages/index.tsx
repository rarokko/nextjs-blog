import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { listUsers } from './api/dynamo_scan'
// import { getSortedPostsData } from '../lib/posts'
import Link from 'next/link'
import Date from '../components/date'
import { User } from '../models/User'

export default function Home({ users }: { users: Array<User> }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building and deploying a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Usernames</h2>
        <ul className={utilStyles.list}>
          {users.map(({ username }, index) => {
            return (<li key={`user_${index}`}>{username}</li>)
          })}
        </ul>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  try {
    const users: Array<User> = await listUsers();

    return {
      props: {
        users
      }
    }

  } catch (e) {
    console.log(e);
  }
}
