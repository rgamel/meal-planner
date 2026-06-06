import { Combobox, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useCallback, useState } from 'react'
import { Entity, EntityOptionType } from 'types'

import { CheckmarkIcon } from './icons/Checkmark'
import { UpDownIcon } from './icons/UpDown'
import { XMarkIcon } from './icons/XMark'

type HeadlessComboboxProps = {
  suggestions: Entity[]
  label: string
  selected: EntityOptionType | null
  setSelected: Dispatch<SetStateAction<EntityOptionType | null>>
  addItem: (item: EntityOptionType) => Entity
}

export default function ComboBox({
  label,
  suggestions,
  selected,
  setSelected,
  addItem,
}: Readonly<HeadlessComboboxProps>) {
  const [query, setQuery] = useState('')

  function clearQuery() {
    setQuery('')
  }

  function clearSelected() {
    setSelected(null)
  }

  function clearInput() {
    clearSelected()
    clearQuery()
  }

  function getDisplayValue() {
    return selected?.name ?? ''
  }

  function handleQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value)
  }

  const filteredSuggestions =
    query === ''
      ? suggestions
      : suggestions.filter((suggestion) => suggestion.name.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="outline outline-2 outline-green-200">
      <label className="italic">{label}</label>
      <div> {query}</div>
      <Combobox value={selected} onChange={setSelected} nullable>
        <div className="w-full">
          <div className="flex w-full flex-row overflow-hidden bg-white text-left">
            <Combobox.Input
              className="w-full py-2 pr-10 pl-3 leading-5 text-gray-900"
              aria-label="selection"
              displayValue={getDisplayValue}
              onChange={handleQueryChange}
            />
            <button
              type="button"
              className="flex items-center border border-2 border-green-400 px-3 py-2"
              onClick={clearInput}
            >
              <XMarkIcon />
            </button>
            <Combobox.Button className="flex items-center px-3 py-2">
              <UpDownIcon />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opactiy-0"
            afterLeave={clearQuery}
          >
            <Combobox.Options className="max-h-60 w-full overflow-auto bg-white py-1">
              {filteredSuggestions.length === 0 && query.length > 0 ? (
                <div>None found</div>
              ) : (
                filteredSuggestions.map((suggestion) => (
                  <Combobox.Option
                    key={suggestion.id}
                    value={suggestion}
                    className={({ active }) =>
                      `py-2 pr-4 pl-10 select-none ${active ? 'bg-blue-700 text-white' : 'text-gray-900'}`
                    }
                  >
                    {({ selected, active }) => (
                      <div className="flex flex-row">
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {suggestion.name}
                        </span>
                        {selected ? (
                          <span
                            className={`inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-blue-700'}`}
                          >
                            <CheckmarkIcon />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}
