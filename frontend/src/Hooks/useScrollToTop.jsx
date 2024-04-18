export default function useScrollToTop() {

  function goTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return {goTop}
}