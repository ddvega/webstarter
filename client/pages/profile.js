// import React from 'react'
// import { useAuth0 } from '@auth0/auth0-react'

// export const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0()

//   if (isLoading) {
//     return <div>Loading ...</div>
//   }

//   return (
//     isAuthenticated ? (
//       <div>
//         <img src={user.picture} alt={user.name} />
//         <h2>{user.name}</h2>
//         <p>{user.email}</p>
//       </div>
//     ) : (
//       <div>Guest</div>
//     )
//   )
// }
import React from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  
  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
