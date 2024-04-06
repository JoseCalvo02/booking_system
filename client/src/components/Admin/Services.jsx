import React, { useState } from 'react';

const Services = () => {
    const [cards] = useState([
        {
            title: 'Service 1',
            description: 'Description 1',
            time: 'Time 1',
            cost: 'Cost 1'
        },
        {
            title: 'Service 2',
            description: 'Description 2',
            time: 'Time 1',
            cost: 'Cost 1'
        },
        {
            title: 'Service 3',
            description: 'Description 3',
            time: 'Time 1',
            cost: 'Cost 1'
        },
        {
            title: 'Service 4',
            description: 'Description 4',
            time: 'Time 1',
            cost: 'Cost 1'
        }
    ]); // Array of cards for services
    return (
        <div className='w-full h-full p-8 overflow-auto bg-white shadow-custom rounded-xl'>
            <div className='m-auto'>
                <h1 className='p-1 mb-4 text-lg font-semibold text-center bg-bgWhite md:text-xl lg:text-2xl'>Services</h1>

                {/* Cards section for services */}
                <section className='flex flex-col flex-wrap justify-between md:flex-row lg:gap-3'>
                    { cards.map((card, i) => (
                        <div key={i} className='w-full md:w-[48%] lg:w-[31%] h-64 p-8 bg-bgWhite rounded-xl mb-4 shadow-custom hover:shadow-none text-center content-center'>
                            <h3 className='text-xl font-semibold'>{card.title}</h3>
                            <p>{card.description}</p>
                            <p>{card.time}</p>
                            <p>{card.cost}</p>
                        </div>
                    ))}
                </section>
            </div>
        </div>
    );
}

export default Services;