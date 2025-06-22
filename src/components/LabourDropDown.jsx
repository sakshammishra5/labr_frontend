import React from 'react';
import { Label } from './ui/label';
import { useDispatch, useSelector } from 'react-redux';
import { setLabourType } from '@/store/Slices/labour.slice';

const LabourDropDown = () => {
  const dispatch = useDispatch();
  const { labourType } = useSelector((state) => state.labour.LabourConfig);

  const labourTypes = [
    { value: "", label: "Select Labor Type" },
    { value: "painter", label: "Painter" },
    { value: "carpenter", label: "Carpenter" },
    { value: "electrician", label: "Electrician" },
    { value: "labour", label: "Labour" },
  ];

  return (
    <>
      <Label
        htmlFor="labor-type"
        className="mr-1.5 block text-sm font-medium text-gray-700"
      >
        Labour type
      </Label>
      <select
        name="labor-type"
        value={labourType}
        onChange={(e) => dispatch(setLabourType(e.target.value))}
        className="mr-1.5 appearance-none w-48 p-2.5 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-700"
      >
        {labourTypes.map((type) => (
          <option key={type.value} value={type.value}>
            {type.label}
          </option>
        ))}
      </select>
    </>
  );
};

export default LabourDropDown;