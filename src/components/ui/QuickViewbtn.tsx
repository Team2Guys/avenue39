import React from 'react'
import { IoEyeOutline } from 'react-icons/io5'
interface IQuickView {
    // slider: boolean
    ClassName:string
    accessoriesSlider?: boolean
}

function QuickViewbtn({ClassName }: IQuickView) {
  return (
    <button
    aria-haspopup="dialog"
    aria-expanded="false"
    aria-controls="radix-:r6:"
    data-state="closed"
    className={ClassName}
  >
    {/* <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.41"
      height="9.475"
      viewBox="0 0 17.41 9.475"
      className="fill-white"
    >
      <g
        id="eye-svgrepo-com_1_"
        data-name="eye-svgrepo-com (1)"
        transform="translate(0 -100.736)"
      >
        <g
          id="Group_1742"
          data-name="Group 1742"
          transform="translate(0 100.736)"
        >
          <path
            id="Path_428"
            data-name="Path 428"
            d="M8.705,110.211A10.685,10.685,0,0,1,2.612,108,15.425,15.425,0,0,1,.12,105.8a.492.492,0,0,1,0-.645,15.426,15.426,0,0,1,2.492-2.2,10.686,10.686,0,0,1,6.093-2.214A10.686,10.686,0,0,1,14.8,102.95a15.427,15.427,0,0,1,2.492,2.2.492.492,0,0,1,0,.645A15.428,15.428,0,0,1,14.8,108,10.685,10.685,0,0,1,8.705,110.211Zm-7.538-4.737A15.54,15.54,0,0,0,3.2,107.209a9.9,9.9,0,0,0,5.5,2.017,9.9,9.9,0,0,0,5.5-2.017,15.54,15.54,0,0,0,2.036-1.736,15.535,15.535,0,0,0-2.036-1.736,9.9,9.9,0,0,0-5.5-2.017,9.9,9.9,0,0,0-5.5,2.017A15.533,15.533,0,0,0,1.167,105.474Z"
            transform="translate(0 -100.736)"
          />
        </g>
        <g
          id="Group_1743"
          data-name="Group 1743"
          transform="translate(5.653 102.421)"
        >
          <path
            id="Path_429"
            data-name="Path 429"
            d="M146.572,149.626a3.052,3.052,0,1,1,2.011-5.349.492.492,0,0,1-.649.741,2.068,2.068,0,1,0,.706,1.556.492.492,0,1,1,.985,0A3.056,3.056,0,0,1,146.572,149.626Z"
            transform="translate(-143.52 -143.521)"
          />
        </g>
        <g
          id="Group_1744"
          data-name="Group 1744"
          transform="translate(7.72 104.489)"
        >
          <path
            id="Path_430"
            data-name="Path 430"
            d="M197,197.99a.985.985,0,1,1,.985-.985A.986.986,0,0,1,197,197.99Z"
            transform="translate(-196.02 -196.021)"
          />
        </g>
      </g>
    </svg> */}
    <IoEyeOutline size={15} />
    Quick View
  </button>
  )
}

export default QuickViewbtn