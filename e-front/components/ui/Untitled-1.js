"use client"

import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronsUpDown, Search } from 'lucide-react'
// import { CheckIcon, ChevronUpDownIcon } from '@'

const people = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

interface CategoryPageProps {
    params:{
        categoryId: string;
    },
    searchParams: {
        colorId?: string;
        sizeId?: string;
    }
}

export default function Example() {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(people[0])
    const [query, setQuery] = useState('')

    const openMenu = () => {
        setOpen(!open)
    }

    const filteredPeople =
        query === ''
            ? people
            : people.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <div className={` ${open ? 'w-[260px]' : 'w-[30px]'}  flex transition duration-300 justify-center items-center`}>
            <div className="text-gray-500 hover:text-gray:900 cursor-pointer">
                <Search className="" onClick={openMenu}></Search>

            </div>
            <div className={`${open ? 'w-full visible' : 'w-0 hidden'}transition duration-300`}>
                <Combobox  onChange={setSelected}>
                    <div className="relative mt-1">
                        <div className={`transition duration-300 ml-4 bg-none relative  cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
                            <Combobox.Input
                                className={`w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 focus:outline-none`}
                                displayValue={(person) => person.name}
                                onChange={(event) => setQuery(event.target.value)}
                                onFocus={() => setQuery('')}
                            />

                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronsUpDown
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery('')}
                        >
                            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPeople.length === 0  ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPeople.map((person) => (
                                        <Combobox.Option
                                            key={person.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                                }`
                                            }
                                            value={person}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                                }`}
                                                        >
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>

        </div>
    )
}
