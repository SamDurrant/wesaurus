import React, { createContext, useState } from 'react'

const MainContext = createContext([{}, () => {}])

const MainProvider = ({ children }) => {
  const [state, setState] = useState({
    definitions: [
      {
        definition_id: 1,
        author_id: 2,
        word_id: 24,
        text: `a function that has no side effects like affecting another part of a program and always return something based on an input. Same input results in same output.`,
        like_count: 9,
      },
      {
        definition_id: 2,
        author_id: 2,
        word_id: 25,
        text: `pieces of memory that the application has used in the past but is not needed any longer but has not yet been returned back to us.`,
        like_count: 14,
      },
      {
        definition_id: 3,
        author_id: 3,
        word_id: 25,
        text: `A Memory leak can be defined as a piece of memory that is no longer being used or required by an application but for some reason is not returned back to the OS and is still being occupied needlessly.`,
        like_count: 23,
      },
      {
        definition_id: 4,
        author_id: 2,
        word_id: 25,
        text: `Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa vel aut tempore, quod minima dicta libero sapiente, voluptatum commodi omnis nobis aliquam reiciendis ad! Soluta, natus dolore!`,
        like_count: 12,
      },
      {
        definition_id: 5,
        author_id: 2,
        word_id: 25,
        text: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis ex sit a, autem saepe cum. Consequatur ut quibusdam exercitationem doloribus dicta culpa.`,
        like_count: 5,
      },
      {
        definition_id: 6,
        author_id: 2,
        word_id: 25,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio labore ex quis sapiente voluptates culpa minus, suscipit, neque tenetur tempore cumque obcaecati odio molestias nobis doloremque quisquam non corporis, beatae eius. Ducimus, similique praesentium?`,
        like_count: 8,
      },
      {
        definition_id: 7,
        author_id: 2,
        word_id: 25,
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis non minima tempora provident nostrum debitis!`,
        like_count: 2,
      },
    ],
  })

  return (
    <MainContext.Provider value={[state, setState]}>
      {children}
    </MainContext.Provider>
  )
}

export { MainContext, MainProvider }
