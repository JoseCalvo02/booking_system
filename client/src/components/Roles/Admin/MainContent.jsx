import React from 'react'

function MainContent() {
    return (
        <main className='flex flex-col w-full col-span-5'>
            <header className='px-8 py-4 mx-6 mt-6 mb-2 bg-white shadow-custom rounded-xl'>
                <h1>Header</h1>
            </header>

            <section className='flex flex-grow gap-8 m-6'>
                <div className='w-3/4 p-8 bg-white shadow-custom rounded-xl'>
                    <h2>Content</h2>
                </div>

                <div className='w-1/4 p-8 bg-white shadow-custom rounded-xl'>
                    <h3>Sub Content</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, ducimus velit dolorem autem cupiditate dolores quasi! Fugit, dicta laboriosam magni illo quia laborum dolor. Suscipit ex, perspiciatis mollitia numquam velit autem laborum accusamus laboriosam ea dolorem quo nobis nesciunt repellendus dignissimos cupiditate quia tenetur enim tempora corporis adipisci. Rem, ipsa.</p>
                </div>
            </section>
        </main>
    )
}

export default MainContent