import React from 'react'

function MainContent() {
    return (
        <main className='col-span-5 bg-blue-500'>
            <header className='flex flex-col w-full gap-4 p-4 bg-green-400 md:flex-row h-[6%]'>
                <h1>Header</h1>
            </header>

            <section className='flex h-[94%]'>
                <div className='w-2/3 p-4 bg-green-500'>
                    <h2>Content</h2>
                </div>

                <div className='w-1/3 p-4 bg-green-600'>
                    <h3>Sub Content</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, ducimus velit dolorem autem cupiditate dolores quasi! Fugit, dicta laboriosam magni illo quia laborum dolor. Suscipit ex, perspiciatis mollitia numquam velit autem laborum accusamus laboriosam ea dolorem quo nobis nesciunt repellendus dignissimos cupiditate quia tenetur enim tempora corporis adipisci. Rem, ipsa.</p>
                </div>
            </section>
        </main>
    )
}

export default MainContent