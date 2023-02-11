export const useMoneyUtils = () => {

    const format = (count: number) => {
        const formatter = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
        return formatter.format(count).replace('₫', '').trim()
    }

    return {
        format
    }
}
