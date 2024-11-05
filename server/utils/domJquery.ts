export function extractValues($: any, selector: string, attribute?: string) {
  return $(selector)
    .map(function () {
      return attribute ? $(this).attr(attribute) : $(this).text()
    })
    .get()
}
