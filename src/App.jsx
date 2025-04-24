import React, { useEffect } from 'react'
import { useState } from 'react'

// const temporary = {
//   "login": "Prince-Sharma-07",
//   "id": 131739429,
//   "node_id": "U_kgDOB9ovJQ",
//   "avatar_url": "https://avatars.githubusercontent.com/u/131739429?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/Prince-Sharma-07",
//   "html_url": "https://github.com/Prince-Sharma-07",
//   "followers_url": "https://api.github.com/users/Prince-Sharma-07/followers",
//   "following_url": "https://api.github.com/users/Prince-Sharma-07/following{/other_user}",
//   "gists_url": "https://api.github.com/users/Prince-Sharma-07/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/Prince-Sharma-07/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/Prince-Sharma-07/subscriptions",
//   "organizations_url": "https://api.github.com/users/Prince-Sharma-07/orgs",
//   "repos_url": "https://api.github.com/users/Prince-Sharma-07/repos",
//   "events_url": "https://api.github.com/users/Prince-Sharma-07/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/Prince-Sharma-07/received_events",
//   "type": "User",
//   "user_view_type": "public",
//   "site_admin": false,
//   "name": "Prince sharma",
//   "company": null,
//   "blog": "",
//   "location": "india, uttar pradesh, saharanpur",
//   "email": null,
//   "hireable": null,
//   "bio": "I'm pursuing my B.tech CSE degree from Quantum University Roorkee India. I'm passionate about learning new technologies and developing applications.",
//   "twitter_username": null,
//   "public_repos": 25,
//   "public_gists": 0,
//   "followers": 15,
//   "following": 7,
//   "created_at": "2023-04-25T04:40:19Z",
//   "updated_at": "2025-04-18T12:52:56Z"
// }

// function effectCallbackFn(){
//   console.log("I am called")
// }


export default function App() {
  const [userData, setUserData] = useState("")
  const [error, setError] = useState("")

  async function getUserData(username) {
    setUserData("")
    setError("")
    try {
      if(username){
        const response = await fetch(`https://api.github.com/users/${username}`)
        console.log(response)
        if (!response.ok) {
           throw new Error("User Not Found");       
        }
        const data = await response.json()
        setUserData(data ?? "")
     }
    } catch (error) {
      setError(error.message ?? "User not found")
    }
  }

  function handleSubmit(input) {
     getUserData(input)
  }

  return (
    <div className=' App '>

      <UserInput handleSubmit={handleSubmit} />
      {error ? <ErrorBox error={error} /> : null}
      {userData && !error ? <UserCard userData={userData} /> : null}

    </div>
  )
}

function UserInput({ handleSubmit }) {

  const [InputValue, setInputValue] = useState("")
  // setInterval(()=>handleSubmit(InputValue) , 10000)
  useEffect(() => {
    let timer = setTimeout(() => handleSubmit(InputValue), 1000)
    return () => {
      clearInterval(timer)
    }
  }, [InputValue])

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      return handleSubmit(InputValue, e)
    }}
      className='max-w-[1280px] mx-auto flex gap-4 p-4 bg-slate shadow-md rounded-md m-auto '>
      <input value={InputValue} onChange={(e) => setInputValue(e.target.value)} type="search" placeholder='Enter Your Username...' autoFocus className='flex-1 border-gray-200 rounded-md px-4 py-2 border-2' />
      <button type="submit" className='bg-green-500 text-white font-semibold px-4 py-2 rounded-md cursor-pointer'>Search</button>
    </form>
  )
}


function UserCard({ userData = {} }) {
  const { avatar_url, name, login, bio, public_repos, public_gists, followers, following, created_at, updated_at, twitter_username, location, html_url } = userData

  const stats = [
    {
      label: "Repositories",
      value: public_repos,
    },
    {
      label: "Followers",
      value: followers,
    },
    {
      label: "Following",
      value: following,
    },
    {
      label: "Gists",
      value: public_gists,
    }
  ];

  const details = [
    {
      label: 'Location',
      value: location ?? "Not Available"
    },
    {
      label: 'Twitter',
      value: twitter_username ?? "Not Available"
    },
    {
      label: 'Member Since',
      value: created_at ?? "Not Available"
    },
    {
      label: 'Last Updated',
      value: updated_at ?? "Not Available"
    }
  ]

  return (
    <div className='max-w-[1280px] mx-auto gap-4 rounded-md shadow-md  text-white'>
      <div className='flex flex-col gap-2 p-8 justify-center bg-slate-900 items-center' >
        <img src={avatar_url} alt="GitHub Avatar" className='w-32 h-32 rounded-full m-auto shadow-md' />
        <span className='font-bold text-2xl'>{name}</span>
        <a href={html_url} target='__blank' className='text-xm'>@{login}</a>
        <p>{bio}</p>
      </div>

      <div className="w-full p-8 flex flex-col gap-8 justify-center items-center">
        <div className="w-full flex justify-center gap-4">
          {stats.map((stat) => {
            return <Card1 {...stat} />
          })}
        </div>

        <div className='w-full gap-y-8 grid grid-cols-2 grid-rows-1 gap-x-16 border-2'>
          {[...details].map((detail) => {
            return <Card2 {...detail} />
          })}
        </div>

        <a href={html_url} target='__blank'>
          <button className='flex justify-center items-center gap-4 px-4 py-2 bg-blue-500 rounded-lg text-white cursor-pointer'>
            <img
              src="https://avatars.githubusercontent.com/u/583231?v=4"
              alt="Github Avatar"
              className="w-4 h-4 rounded-full"
            />
            View on GitHub
          </button></a>
      </div>
    </div>
  )
}

function Card1({ label, value }) {

  return (
    <div className="p-4 h-22 w-28 flex flex-col gap-1 rounded-2xl border-2 items-center text-black">
      <span >{value}</span>
      <span >{label}</span>
    </div>
  )
}

function Card2({ label, value }) {
  return (
    <div className='flex gap-2 items-center text-nowrap'>
      <span className='text-gray-600'>{label}: </span>
      <span className='text-slate-950 font-semibold'>{value} </span>
    </div>
  )
}

function ErrorBox({ error }) {
  return (
    <div className="w-full text-center justify-center flex gap-4 p-4 bg-white border-red-500 shadow-red-500 rounded-md shadow-md m-auto">
      {error}
    </div>
  )
}



