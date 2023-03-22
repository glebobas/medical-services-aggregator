import {useContext, useState} from 'react'
import { Switch } from '@headlessui/react'
import {AuthContext} from "../../context";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Toggle() {
  const {locale, setLocale} = useContext(AuthContext)

  const [enabled, setEnabled] = useState(locale === 'ru')

  const toggleLanguage = () => {
    setEnabled(!enabled)
    setLocale(enabled ? 'en' : 'ru')
  }

  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="mr-3">
        <span className="text-sm font-medium text-gray-900">{enabled ? 'Русский' : 'English'}</span>
      </Switch.Label>
      <Switch
        checked={enabled}
        onChange={toggleLanguage}
        className={classNames(
          enabled ? 'bg-gray-400' : 'bg-gray-400',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent' +
          'transition-colors duration-200 ease-in-out focus:outline-none focus:ring-gray-500 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}
