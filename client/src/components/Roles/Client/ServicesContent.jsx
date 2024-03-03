import React from 'react';
import FondoClient from '../../../assets/Sunset.jpg';
import prueba2 from '../../../assets/prueba2.jpg';
import prueba3 from '../../../assets/prueba3.jpg';

function ServicesContent() {
    return (
        <main className='flex flex-col w-3/4 m-auto' id='services'>
            <section className='flex flex-grow gap-8 m-auto mt-24' >
                <div class="grid-cols-1 sm:grid md:grid-cols-3 ">
                    <div
                        class="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                        <a href="#!">
                            <img
                                class="rounded-t-lg"
                                src="https://tecdn.b-cdn.net/img/new/standard/city/041.webp"
                                alt="Hollywood Sign on The Hill" />
                            </a>
                        <div class="p-6">
                            <h5
                                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Card title
                            </h5>
                            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </p>
                        </div>
                    </div>
                    <div
                        class="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                        <a href="#!">
                            <img
                                class="rounded-t-lg"
                                src="https://tecdn.b-cdn.net/img/new/standard/city/042.webp"
                                alt="Palm Springs Road" />
                            </a>
                        <div class="p-6">
                            <h5
                                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Card title
                            </h5>
                            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </p>
                        </div>
                    </div>
                    <div
                        class="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                        <a href="#!">
                            <img
                                class="rounded-t-lg"
                                src="https://tecdn.b-cdn.net/img/new/standard/city/044.webp"
                                alt="Skyscrapers" />
                            </a>
                        <div class="p-6">
                            <h5
                                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Card title
                            </h5>
                            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content.
                            </p>
                        </div>
                    </div>
                    <div
                        class="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0">
                        <a href="#!">
                            <img
                                class="rounded-t-lg"
                                src="https://tecdn.b-cdn.net/img/new/standard/city/043.webp"
                                alt="Los Angeles Skyscrapers" />
                            </a>
                        <div class="p-6">
                            <h5
                                class="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                                Card title
                            </h5>
                            <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                                This is a longer card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit
                                longer.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ServicesContent;


