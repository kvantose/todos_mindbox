import "./Footer.scss"

export const Footer = () => {
    return (
        <div className="flex justify-between items-center">
            <p className="text-sm text-gray-400">
                Тестовое задание Frontend intern в Mindbox
            </p>
            <p className="text-sm text-gray-400">
                Мой сайт:
                <a href="https://kvantoose.github.io/"
                    target="_blank"
                    className="footer_link 
                     ml-1">
                    https://kvantoose.github.io/
                </a>
            </p>
        </div>
    )
}