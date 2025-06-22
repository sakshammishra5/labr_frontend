const LaborCard = ({ name, type, location, rating, image }) => {
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    className={`w-5 h-5 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }
        return stars;
    };

    return (
        <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center mb-4">
                <img
                    src={image || "https://via.placeholder.com/80"}
                    alt={name}
                    className="w-20 h-20 rounded-full mr-4 object-cover"
                />
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2.5 py-1 rounded-full">
                        {type}
                    </span>
                </div>
            </div>
            <div className="flex items-center mb-4">
                {renderStars(rating)}
                <span className="ml-2 text-gray-600">({rating}/5)</span>
            </div>
            <p className="text-gray-600 mb-4">
                <span className="font-medium">Location:</span> {location}
            </p>
            <button className="w-full p-2 bg-green-600 text-white rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Contact Now
            </button>
        </div>
    );
};


export default LaborCard