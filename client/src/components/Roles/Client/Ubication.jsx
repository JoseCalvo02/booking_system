import React from 'react';

function LocationMap() {
    return (
        <section className="relative w-full mb-10 h-96">
            <h2 className="absolute top-0 left-0 z-10 m-5 text-4xl font-medium leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black bg mt-44">Encuentranos Aqui</h2>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d416.5701490952807!2d-84.43285403708049!3d10.331043348534896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTDCsDE5JzUyLjQiTiA4NMKwMjUnNTguNSJX!5e0!3m2!1ses!2scr!"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
            ></iframe>
        </section>
    );
}

export default LocationMap;







