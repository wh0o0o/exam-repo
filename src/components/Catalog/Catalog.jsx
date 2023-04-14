import style from "./catalog.module.css"
import search from "../../assets/img/search.png"
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "../basket/basket"

const Catalog = () => {
    const [data, setData] = useState()
    const [searchData, setSearch] = useState('')
    const [cat, setCat] = useState('')

    const [categories, setCategories] = useState()

    const unDataSale = data?.filter((item) => item.discount > 0)

    const fetchServices = async () => {
        const response = await fetch(`https://api.avavion.ru/api/products`)
        const data = await response.json()

        setData(data.data)
    }

    const fetchServicesCategories = async () => {
        const response = await fetch(`https://api.avavion.ru/api/tags`)
        const data = await response.json()

        setCategories(data.data)
    }

    useEffect(() => {
        fetchServices()
        fetchServicesCategories()
    }, [])

    const categoryData = unDataSale?.filter((item) => item.tag.includes(cat))

    const searchDataMassive = categoryData?.filter((item) => item.name.includes(searchData))  

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={style.catalog} id={'#catalog'}>
            <div className={style.header_catalog}>
                <h1 className={style.h1_catalog}>
                    Каталог
                </h1>
                <div className={style.input}>
                    <input type="text" placeholder="Поиcк..." onChange={(e) => handleChangeSearch(e)} value={searchData}/>
                    <div className={style.ikon_search}>
                        <img src={search} alt=""/>
                    </div>
                </div>
            </div>
            <select name="" id="" onChange={(e) => setCat(e.target.value)} className={style.cat_input}>
                {
                    categories?.map((category) => {
                        return <option value={category.name}>{category.name}</option>
                    })
                }
            </select>
            <div className={style.catalog_wrapper}>
                {
                    searchDataMassive?.map((item) => {
                    return (
                    <div className={style.tovar} key={item.id}>
                        <NavLink to={`/tovar/${item.id}`}>
                        <div className={style.img_tovar}>
                            <img src={item.image_url} alt="" />
                        </div>
                        </NavLink>
                        <p className={style.title}>{item.name}</p>
                        <div className={style.prices}>
                        <p className={style.price_old}> {format(item.price)} ₽</p>
                        <p className={style.price}> {
                        format(item.price * (item.discount/100))
                        } ₽</p>
                        </div>
                    </div>
                    );
                })
            }
            </div>
        </div>
    )
}

export default Catalog