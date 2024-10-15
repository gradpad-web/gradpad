import PropTypes from 'prop-types'

function Input({ type, required, label, className }) {
  return (
    <div className="relative floating-label">
      <input className={`relative sm:text-sm sm:leading-6 transition-all ease-in-out duration-300 py-1.5 block w-full border-b-2 border-black dark:border-white focus:border-teal bg-transparent text-black dark:text-white icon-end ${className}`} type={type} required={required} />
      <label className="absolute text-sm font-medium leading-none text-black dark:text-white transition-all ease-in-out duration-300 top-[14px] left-3 inline-block py-0 px-0 pointer-events-none">{label}</label>
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default Input