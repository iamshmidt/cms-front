"use client"

import { Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronsUpDown, Search } from 'lucide-react'
import { Result } from '@/types'
import Link from 'next/link'
import Image from "next/image";
import Currency from './currency'
import BadgeAlert from '../badge-alert'
import OutsideClickHandler from 'react-outside-click-handler';
// import { CheckIcon, ChevronUpDownIcon } from '@'

// const data = [
//     { id: 1, name: 'Wade Cooper' },
//     { id: 2, name: 'Arlene Mccoy' },
//     { id: 3, name: 'Devon Webb' },
//     { id: 4, name: 'Tom Cook' },
//     { id: 5, name: 'Tanya Fox' },
//     { id: 6, name: 'Hellen Schmidt' },
// ]


interface SearchResult {
    data: Result[];
}
const SearchCard: React.FC<SearchResult> = ({
    data
}) => {
    console.log('data', data)
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(data[0])
    const [query, setQuery] = useState('')


    const openMenu = () => {
        setOpen(!open)
    }

    useEffect(() => {

     }, [])

    const filteredPeople =
        query === ''
            ? data
            : data.filter((person) =>
                person.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    return (
        <OutsideClickHandler
            onOutsideClick={() => {
                setOpen(false)
            }}
        >
            <div className={` ${open ? 'w-[360px]' : 'w-[30px]'}  flex  transition-all duration-300 justify-center items-center mr-2 gap-2`}>

                <div className="text-gray-500 hover:text-gray:900 cursor-pointer">
                    <Search onClick={openMenu}></Search>

                </div>


                <div className={`${open ? 'w-[400px] opacity-100 visible' : 'w-0 opacity-0 invisible'} transition-all duration-300`}>
                    <Combobox onChange={setSelected}>
                        <div className="relative mt-1">
                            <div className={`transition duration-300  bg-none relative  cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm`}>
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
                                    {filteredPeople.length === 0 ? (
                                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                            Nothing found.
                                        </div>
                                    ) : (
                                        filteredPeople.map((person) => (
                                            <Combobox.Option
                                                key={person.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-violet-50 text-gray-600' : 'text-gray-900'
                                                    }`
                                                }
                                                value={person}
                                            >
                                                {({ selected, active }) => (
                                                    <>
                                                        <div className="flex">
                                                            <div className="max-w-sm  py-2 w-full">
                                                                <Link href={`/product/${person.id}`} legacyBehavior>
                                                                    <a className="flex items-center  gap-4" onClick={() => setOpen(false)}>
                                                                        <Image src={person?.images?.[0]?.url} alt={person.name} width={70} height={30} className="object-cover object-center border border-gray-300/50 rounded" />
                                                                        <div className="flex flex-col gap-2">
                                                                            <div className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                                }`}> {person.name}</div>
                                                                            <div className="flex flex-col items-left justify-between gap-2">
                                                                                <Currency value={person?.price} />
                                                                                {person.quantity === 0 ? <BadgeAlert title="Out of stock" description="Out of stock" variant="outOfStock"></BadgeAlert> : null}

                                                                            </div>
                                                                        </div>

                                                                    </a>
                                                                </Link>
                                                            </div>

                                                        </div>

                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-gray-200' : 'bg-violet-50'
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
        </OutsideClickHandler>
    )
}
export default SearchCard;