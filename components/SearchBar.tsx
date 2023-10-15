'use client'

import React, { useState } from 'react';
import SearchManufacturer from './SearchManufacturer';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { useRouter } from 'next/navigation';

const SearchButton = ({ styles }: { styles: string }) => (
    <button type='submit' className={twMerge(`-ml-3 z-10`, styles)}>
      <Image
        src="/magnifying-glass.svg"
        alt="magnifying glass"
        width={40}
        height={40}
        className='object-contain'
      />
    </button>
  );    
  
const SearchBar = () => {
    const [manufacturer, setManufacturer] = useState('')
    const [model, setModel] = useState("")
    const router = useRouter()

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (manufacturer.trim() === "" && model.trim() === "") {
            return alert("Please provide some input");
        }

        updateSearchParams(model.toLowerCase(), manufacturer.toLowerCase())
    }

    const updateSearchParams = (model: string, manufacturer: string) => {
        const searchParams = new URLSearchParams(window.location.search)
        console.log("searchParams: ", searchParams)
        if(model){
            searchParams.set('model', model)
        } else (
            searchParams.delete('model', model)
        )

        if(manufacturer){
            searchParams.set('manufacturer', manufacturer)
        } else (
            searchParams.delete('manufacturer', manufacturer)
        )
        console.log("updated searchParams: ", searchParams)

        const newPathname = `${window.location.pathname}?${searchParams.toString()}`

        router.push(newPathname)
    }

    return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
            <SearchManufacturer
                manufacturer={manufacturer}
                setManufacturer={setManufacturer}
            />
            <SearchButton styles='sm:hidden'/>
        </div>

        <div className="searchbar__item">
            <Image src="/model-icon.png" alt='car model' width={25} height={25}
                className='absolute w-[20px] h-[20px] ml-4'
            />
            <input type="text" name="model" 
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder='Model...'
                className="searchbar__input"
            />
            <SearchButton styles='sm:hidden'/>
        </div>
        <SearchButton styles='max-sm:hidden'/>
    </form>
  )
}

export default SearchBar