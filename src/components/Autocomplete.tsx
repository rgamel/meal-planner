import { Combobox, ComboboxInput, ComboboxOptions, Description, Field, Transition } from '@headlessui/react'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
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
  description?: string
}

export default function ComboBox({
  label,
  suggestions,
  selected,
  setSelected,
  addItem,
  description,
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
    <Field>
      <label className="text-gray-600">{label}</label>
      {description && <Description className="hidden">{description}</Description>}

      <Combobox value={selected} onChange={setSelected}>
        <div className="">
          <div className="">
            <ComboboxInput
              className=""
              aria-label="selection"
              displayValue={getDisplayValue}
              onChange={handleQueryChange}
            />
            <button type="button" className="" onClick={clearInput}>
              <XMarkIcon />
            </button>
            <Combobox.Button className="">
              <UpDownIcon />
            </Combobox.Button>
          </div>

          <div className="">
            <ComboboxOptions
              // anchor={{ to: '', gap: '4px' }}
              className=""
            >
              {filteredSuggestions.length === 0 && query.length > 0 ? (
                <div className="">None found</div>
              ) : (
                filteredSuggestions.map((suggestion) => (
                  <Combobox.Option key={suggestion.id} value={suggestion} className={({ active }) => ``}>
                    {({ selected, active }) => (
                      <div className="">
                        <span className={``}>{suggestion.name}</span>
                        {selected ? (
                          <span className={``}>
                            <CheckmarkIcon />
                          </span>
                        ) : null}
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </ComboboxOptions>
          </div>
        </div>
      </Combobox>
    </Field>
  )
}
