import React from 'react';

const SelectCupon = ({ cuponesCanjeados, selectedService, selectedCoupon, setSelectedCoupon }) => {

    const handleCouponChange = (event) => {
        const cuponID = parseInt(event.target.value);
        const cupon = cuponesCanjeados.find(cupon => cupon.cuponID === cuponID);
        setSelectedCoupon(cupon);
    };

    return (
        <select
            disabled={selectedService === ''}
            value={selectedCoupon.cuponID}
            onChange={handleCouponChange}
            className="w-full p-3 mt-2 mb-2 text-gray-800 bg-white border border-gray-300 rounded-md shadow-md md:w-80 h-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <option value="" disabled={selectedCoupon !== ''} defaultValue hidden className="text-gray-500 ">
                Seleccionar cupón
            </option>
            {cuponesCanjeados.map((coupon) => (
                <option key={coupon.cuponCanjeadoID} value={coupon.cuponID}>
                    {coupon.Cupones.nombreCupon}
                </option>
            ))}
        </select>
    );
}

export default SelectCupon;
