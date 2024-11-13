import React, {FC, useEffect, useState} from 'react';
import {IOption} from "@/types/IOption";

interface Props{
  options: IOption[],
  onChangeOptions(options: IOption[]): void
}

const MultiSelect: FC<Props> = ({options, onChangeOptions}) => {
  const [selectedOptions, setSelectedOptions] = useState<IOption[]>([])
  const [selectedValue, setSelectedValue] = useState("")


  const handleSelectOption = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value)
  }
  const handleDeleteOption = (value: string) => {
    setSelectedOptions(selectedOptions.filter(item => item.value !== value))
  }

  useEffect(() => {
    if (!selectedValue)
      return

    const selectedElem = options.find(item => item.value === selectedValue)
    if (!selectedElem)
      return;

    setSelectedOptions(prevState => [...prevState, selectedElem])
    setSelectedValue("")
  }, [selectedValue]);

  useEffect(() => {
    onChangeOptions(selectedOptions)
  }, [selectedValue]);

  return (
    <div>
      <ul>
        {
          selectedOptions.map(item => <li>{item.label} <button onClick={() => handleDeleteOption(item.value)}>X</button></li>)
        }
      </ul>
      <select value={selectedValue} onChange={handleSelectOption}>
        <option value="">Select</option>
        {
          options.filter(item => !selectedOptions.includes(item)).map(item =>
            <option value={item.value}>{item.label}</option>
          )
        }
      </select>
    </div>
  );
};

export default MultiSelect;