
export default function FloatingActionButtonSize(props) {
    function handleClick(){
      window.scrollTo(0,0)
    }
  return (
    <div className='fab'
      onClick={handleClick}
      aria-label="top">
      <p>top</p>
    </div>
  )
}