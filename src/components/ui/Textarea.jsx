import PropTypes from 'prop-types'

function Textarea({ rows, label, required }) {
  return (
    <div className="relative floating-label">
      <textarea className="relative sm:text-sm sm:leading-6 transition-all ease-in-out duration-300 py-1.5 block w-full border-0 bg-transparent text-black dark:text-white border-b-2 border-black dark:border-white focus:border-teal" rows={rows} required={required} ></textarea>
      <label className="absolute text-sm font-medium leading-none text-black dark dark:text-white transition-all ease-in-out duration-300 top-[14px] left-3 inline-block py-0 px-1 bg-transparent pointer-events-none">{label}</label>
    </div>
  )
}

Textarea.propTypes = {
  rows: PropTypes.number,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool
};

export default Textarea