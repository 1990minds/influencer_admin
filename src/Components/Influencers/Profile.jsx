import React from "react";
const collabs = [
    { name: 'Cafe Mocha', date: '2024-10-12' },
    { name: 'Blue Bottle Coffee', date: '2024-10-10' },
    { name: 'The Roastery', date: '2024-09-22' },
    { name: 'Bean & Co.', date: '2024-09-15' },
  ];
  const future_collabs =[
    {name: "Sri Rangam Cafe", date :"2024-07-26"},
    {name: "KFC", date :"2024-08-26"},
    {name: "Dominos", date :"2024-06-26"},
    {name: "Meghanas Biriyani ", date :"2024-05-26"},
    

  ]

const ProfileCard = () => {
  return (
    <section className="py-3 my-16">
      <div className="container px-4 mx-auto">
        <div className="relative p-6 text-center bg-gray-500 rounded-xl">
          <img
            className="block mx-auto mb-5 w-28 h-28"
            src="path-to-your-image/avatar-men-1.png"
            alt="Profile"
          />
          <h4 className="text-xl text-white font-bold mb-3">John Doe</h4>
          <p className="text-gray-300 mb-3">Food Vlogger</p>
          <span className="inline-block px-2 py-1 mb-6 text-xs text-green-500 font-medium bg-teal-900 rounded-full">
            17.5K Fllowers 
          </span>
          <div className="flex flex-wrap items-center -mx-2">
            <div className="w-full sm:w-1/2 px-2 mb-2 sm:mb-0">
              <a
                className="flex px-2 py-3 items-center justify-center bg-gray-600 hover:bg-gray-700 text-sm leading-6 font-bold text-white rounded-xl transition duration-200"
                href="mailto:email@example.com"
              >
                <svg
                  width="14"
                  height="12"
                  viewBox="0 0 14 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6668 0.666664H2.3335C1.80306 0.666664 1.29436 0.877378 0.919283 1.25245C0.54421 1.62752 0.333496 2.13623 0.333496 2.66666V9.33333C0.333496 9.86376 0.54421 10.3725 0.919283 10.7475C1.29436 11.1226 1.80306 11.3333 2.3335 11.3333H11.6668C12.1973 11.3333 12.706 11.1226 13.081 10.7475C13.4561 10.3725 13.6668 9.86376 13.6668 9.33333V2.66666C13.6668 2.13623 13.4561 1.62752 13.081 1.25245C12.706 0.877378 12.1973 0.666664 11.6668 0.666664ZM11.3935 2L7.4735 5.92C7.41152 5.98248 7.33779 6.03208 7.25655 6.06593C7.17531 6.09977 7.08817 6.1172 7.00016 6.1172C6.91215 6.1172 6.82502 6.09977 6.74378 6.06593C6.66254 6.03208 6.5888 5.98248 6.52683 5.92L2.60683 2H11.3935ZM12.3335 9.33333C12.3335 9.51014 12.2633 9.67971 12.1382 9.80474C12.0132 9.92976 11.8436 10 11.6668 10H2.3335C2.15668 10 1.98712 9.92976 1.86209 9.80474C1.73707 9.67971 1.66683 9.51014 1.66683 9.33333V2.94L5.58683 6.86C5.96183 7.23453 6.47016 7.4449 7.00016 7.4449C7.53016 7.4449 8.03849 7.23453 8.4135 6.86L12.3335 2.94V9.33333Z"
                    fill="#194BFB"
                  ></path>
                </svg>
                <span className="ml-3">Email</span>
              </a>
            </div>
            <div className="w-full sm:w-1/2 px-2">
              <a
                className="flex px-2 py-3 items-center justify-center bg-gray-600 hover:bg-gray-700 text-sm leading-6 font-bold text-white rounded-xl transition duration-200"
                href="tel:+123456789"
              >
                <svg
                  width="15"
                  height="14"
                  viewBox="0 0 15 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.4601 7.66667C12.3134 7.66667 12.1601 7.62 12.0134 7.58667C11.7164 7.52121 11.4245 7.43432 11.1401 7.32666C10.8308 7.21415 10.4908 7.21999 10.1856 7.34307C9.88038 7.46614 9.63146 7.69775 9.48673 7.99333L9.34007 8.29333C8.69074 7.93212 8.09406 7.48349 7.56673 6.96C7.04325 6.43268 6.59461 5.836 6.2334 5.18666L6.5134 5C6.80898 4.85528 7.04059 4.60635 7.16366 4.30113C7.28674 3.9959 7.29258 3.65594 7.18007 3.34666C7.07422 3.06161 6.98736 2.76986 6.92007 2.47333C6.88673 2.32667 6.86007 2.17333 6.84007 2.02C6.75911 1.55041 6.51315 1.12516 6.14648 0.820825C5.77981 0.51649 5.31653 0.353071 4.84007 0.359999H2.84007C2.55275 0.357301 2.26823 0.416541 2.00587 0.533685C1.74351 0.65083 1.50947 0.823129 1.31969 1.03885C1.1299 1.25458 0.988824 1.50866 0.906059 1.78381C0.823295 2.05895 0.800787 2.3487 0.840067 2.63333C1.19523 5.42625 2.47075 8.02125 4.46517 10.0084C6.45958 11.9956 9.05921 13.2617 11.8534 13.6067H12.1067C12.5983 13.6074 13.073 13.427 13.4401 13.1C13.651 12.9114 13.8195 12.6801 13.9344 12.4215C14.0493 12.163 14.108 11.883 14.1067 11.6V9.6C14.0986 9.13692 13.9299 8.69103 13.6296 8.33844C13.3293 7.98585 12.9159 7.74842 12.4601 7.66667ZM12.6401 11.6067C12.6401 11.7048 12.6004 11.7988 12.5286 11.8706C12.4567 11.9425 12.3628 11.9822 12.2647 11.9822H12.0067C9.51408 11.6979 7.158 10.6138 5.30007 8.83333C3.44214 7.05283 2.33847 4.70795 2.06007 2.21333C2.05383 2.11451 2.09325 2.01729 2.16607 1.94635C2.23889 1.87541 2.33983 1.83665 2.44007 1.84H4.44007C4.53391 1.83843 4.62636 1.86953 4.69804 1.92731C4.76972 1.98509 4.81586 2.06533 4.82673 2.15333C4.85973 2.34006 4.90043 2.52489 4.94673 2.70666C5.01943 3.01261 5.10614 3.3125 5.20673 3.60666C5.24642 3.70793 5.24642 3.81907 5.20673 3.92034C5.16705 4.02161 5.09236 4.10683 5.00007 4.16L4.38007 4.54667C4.28055 4.61185 4.19715 4.70341 4.13863 4.81266C4.08011 4.92191 4.04819 5.04594 4.04673 5.17333C4.13523 5.43916 4.2605 5.69278 4.42007 5.92667C4.89516 6.67379 5.48295 7.35871 6.16673 7.96C6.87517 8.59193 7.65589 9.13335 8.4934 9.57333C8.69023 9.68118 8.93497 9.68118 9.1318 9.57333C9.22996 9.51997 9.31418 9.43998 9.3734 9.34L9.78007 8.59333C9.83541 8.49756 9.91989 8.41846 10.0235 8.36688C10.1271 8.31531 10.2447 8.29333 10.3601 8.30333C10.5306 8.31088 10.6943 8.35472 10.8401 8.43C11.1441 8.55623 11.4568 8.66164 11.7734 8.74666C11.9145 8.78647 12.0652 8.78647 12.2063 8.74666C12.3027 8.74935 12.3979 8.78629 12.4686 8.8509C12.5394 8.91551 12.5805 9.00234 12.5801 9.09333L12.5801 11.0933C12.5787 11.1974 12.5394 11.2975 12.4691 11.3682C12.3988 11.4388 12.2987 11.4781 12.1946 11.4767L12.6401 11.6067Z"
                    fill="#194BFB"
                  ></path>
                </svg>
                <span className="ml-3">Call</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-center -mx-2">
          <div className="w-full sm:w-1/2 px-2 my-2">
      <h1 className="flex px-2 py-3 items-center justify-center bg-gray-600 hover:bg-gray-700 text-sm leading-6 font-bold text-white rounded-xl transition duration-200">
        Last few Collabs
      </h1>
      <ul className="mt-3 bg-gray-600 p-2 rounded-lg">
        {collabs.map((collab, index) => (
          <li key={index} className="flex justify-between py-2 px-3 bg-white rounded-md shadow mb-2">
            <span className="text-gray-700 font-semibold">{collab.name}</span>
            <span className="text-gray-500 text-sm">{collab.date}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="w-full sm:w-1/2 px-2 my-2">
      <h1 className="flex px-2 py-3 items-center justify-center bg-gray-600 hover:bg-gray-700 text-sm leading-6 font-bold text-white rounded-xl transition duration-200">
        Future Collabs
      </h1>
      <ul className="mt-3 bg-gray-600 p-2 rounded-lg">
        {future_collabs.map((collab, index) => (
          <li key={index} className="flex justify-between py-2 px-3 bg-white rounded-md shadow mb-2">
            <span className="text-gray-700 font-semibold">{collab.name}</span>
            <span className="text-gray-500 text-sm">{collab.date}</span>
          </li>
        ))}
      </ul>
    </div>
    </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileCard;
