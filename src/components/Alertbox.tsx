import React from "react";
import Button from "./Button";

interface AlertBoxProps {
  title: string;
  handleUserAction?: () => void;
}

const AlertBox: React.FC<AlertBoxProps> = ({ title, handleUserAction }) => {
  return (
    <div className='alert-box'>
      <div
        className='fixed flex justify-center items-center inset-0 bg-gray-700 bg-opacity-50 overflow-y-auto h-full w-full z-10 backdrop-blur'
        id='my-modal'>
        <div className='relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
          <div className='mt-3 text-center'>
            <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
            {handleUserAction && (
              <div className='items-center px-4 py-3'>
                <Button text='Act on Spectrum' onClick={handleUserAction} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertBox;
