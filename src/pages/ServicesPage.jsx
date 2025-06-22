import LaborCard from '@/components/LabourCard';
import Search from '@/components/Search';
import { clearLabour, fetchLaborers, setLabour } from '@/store/Slices/labour.slice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router';
const sampleLaborers = [
  { name: "John Doe", type: "Painter", location: "Laxmi Vihar, Burari", rating: 4, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
  { name: "Mike Smith", type: "Carpenter", location: "Shankarpura, Delhi", rating: 3, image: "https://via.placeholder.com/80" },
];

const ServicesPage = () => {
  const { User } = useSelector((state) => state.app);
  const dispatch=useDispatch();
  const { currentLocation } = User;
  const { labour, loading, error } = useSelector((state) => state.labour.LabourConfig); // Get labourType for Search
  const [searchParams] = useSearchParams();



    // Extract query parameters
    const worktype = searchParams.get('worktype') || '';
    const isAvailable = searchParams.get('isAvailable') || 'true';
    const pincode = searchParams.get('pincode') || '';

    // Fetch laborers when the component mounts or query parameters change
    useEffect(() => {
      console.log("worktype:", worktype, "isAvailable:", isAvailable, "pincode:", pincode);
      if (worktype && pincode) {
        dispatch(fetchLaborers(worktype, isAvailable, pincode));
      }
  
      // Cleanup on unmount
      return () => {
        dispatch(clearLabour());
      };
    }, [worktype, isAvailable, pincode, dispatch]);
  return (
    <>
      <header className="relative">
        <div className="pt-24 pb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Find Trusted Labor Contractors Near You</h2>
          <p className="text-lg md:text-xl text-gray-600 mt-2">Hire skilled workers for house building, painting, plumbing, and more.</p>
          <div className='flex justify-center items-center'>
            <Search  />
          </div>
        </div>
      </header>
      <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
       {!error? `Labourers near ${currentLocation.pincode}` : error}
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">Error: {error}</div>
      ) : labour.length === 0 ? (
        <p className="text-gray-600">No laborers found for this location.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {labour.map((laborer, index) => (
            <Link 
            to={`/labourdetail/${laborer._id}`}
            state={{ laborer }}
            >
              <LaborCard
                key={index}
                name={laborer.username}
                type={laborer.worktype}
                location={laborer.location}
                image={laborer.image}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default ServicesPage;