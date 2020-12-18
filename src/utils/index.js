const minute = 60
const hour = 60 * minute
const day = 24 * hour
const month = 30 * day
const year = 12 * month + 5 * day
const maxTime = 5 * year

export const formatTimeStamp = (time, now) => {
  const diff = Math.round(now - time)
  if (diff <= 0) return '0 秒前'
  else if (diff >= maxTime) return '5年前'
  else if (year <= diff && diff < maxTime) return `${Math.round(diff / year)} 年前666`
  else if (month <= diff && diff < year) return `${Math.round(diff / month)} 月前`
  else if (day <= diff && diff < month) return `${Math.round(diff / day)} 天前`
  else if (hour <= diff && diff < day) return `${Math.round(diff / hour)} 小时前`
  else if (minute <= diff && diff < hour) {
    const n = Math.ceil(diff / minute)
    const m = diff % minute
    if (n === 0) return `${n} 分钟前`
    return `${n} 分钟 ${m} 秒前`
  }
  else return `${diff} 秒前`
}

export const abbr = (txt, len = 8) => {
  if (!txt) return ''
  const head = txt.substr(0, len)
  const tail = txt.substr(-len, len)
  return `${head}...${tail}`
}

export const timestr = n => {
  if (!n) return ''
  const timestamp = +n * 1000
  const time = new Date(timestamp).toLocaleString()
  return time.replace('上午', '').replace('下午', '').replace(/\//g, '-')
}
