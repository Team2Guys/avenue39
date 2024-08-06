import React from 'react'
import { LabelInput } from './ui/label-input'
import { Button } from './ui/button'

const Coupan = ({label}:any) => {
  return (
    <div className="flex w-full items-end space-x-2">
            <LabelInput
              labelClass="px-2"
              label={label}
              className="rounded-none"
              type="text"
              placeholder="Enter your coupon code"
            />
            <Button className="h-[58px] px-10 text-white">Apply Coupon</Button>
          </div>
  )
}

export default Coupan