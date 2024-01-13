// import React from "react";

// export default function Documents(props) {
//   return (
//     <div
//       className={
//         (props.verificationStatus === "Verified"
//           ? "bg-success"
//           : props.verificationStatus === "Rejected"
//           ? "bg-error"
//           : "bg-warning") +
//         " bg-opacity-20  grow w-full justify-center shadow-lg mt-2 mx-6 h-[90%] self-center flex items-center"
//       }
//     >
//       <div className="w-full flex  flex-col  border-1 h-full py-2   ">
//         <div className=" flex justify-evenly ">
//           <h2 className=" bold">{props.userName}</h2>

//           <p>{props.userEmail}</p>
//           <button
//             className={
//               "btn btn-xs  disabled " +
//               (props.verificationStatus === "Verified"
//                 ? "btn-success"
//                 : props.verificationStatus === "Rejected"
//                 ? "btn-error"
//                 : "btn-warning")
//             }
//           >
//             {props.verificationStatus}
//           </button>
//         </div>
//         <div className={" w-full shadow-xl bg-opacity-0 grow p-2 "}>
//           <figure className=" w-full border-r-2 h-full border-gray-400 border-2">
//             <iframe src={props.imgURL} alt="Movie" className=" w-full h-full" />
//           </figure>
//         </div>
//         {props.tokenID ? (
//           <>
//           <div className="divider-horizontal"></div>
//           <div className="w-full py-2 flex justify-end px-2">
//             <text className="btn btn-sm btn-outline  btn-ghost">{"Token ID:"+props.tokenID}</text>
//           </div>
//           </>
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// }
