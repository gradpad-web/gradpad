import { CardBody, CardContainer, CardItem } from "../../components/ui/3dCard";
import { Link } from "react-router-dom";

export default function ThreeDCards() {

  const cardsData = [
    {
      title: 'Make things float in air',
      description: 'Hover over this card to unleash the power of CSS perspective',
      imgPath: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      linkText: 'Try now',
      btnText: 'Sign up'
    },
    {
      title: 'Lorem, ipsum dolor sit amet consectetur',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium excepturi magni illum! Odio facilis repellat eveniet, repudiandae similique, maiores quas porro eligendi fugiat vel, cupiditate quae deleniti. Minus, sed vero!',
      imgPath: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      linkText: 'Lorem',
      btnText: 'Send'
    },
    {
      title: 'Float in air',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laudantium excepturi magni illum! Odio facilis repellat eveniet, repudiandae similique',
      imgPath: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      linkText: 'Link',
      btnText: 'Register'
    },
  ]

  return (
    <div className="container mx-auto mt-10 px-3">
      <div className="max-w-3xl text-center mx-auto">
        <h2 className="text-2xl md:text-4xl font-semibold mb-5 dark:text-white">Title of the section</h2>
        <p className="dark:text-neutral-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores beatae pariatur quam ut, veniam eos architecto eligendi libero excepturi impedit, delectus, repellat nostrum maiores? Explicabo cupiditate odio fuga molestias nostrum.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-5 py-10">
        {
          cardsData.map((item, index) => (
            <CardContainer className="inter-var" key={index}>
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-slate-800 dark:border-white/[0.2] border-black/[0.1] w-auto h-auto rounded-xl py-6 px-3 md:px-6 border">
                <CardItem
                  translateZ={50}
                  className="text-xl font-bold text-neutral-600 dark:text-white"
                >
                  {item.title}
                </CardItem>
                <CardItem
                  as="p"
                  translateZ={60}
                  className="text-neutral-500 text-sm max-w-sm mt-2 line-clamp-3 h-[60px] dark:text-neutral-300"
                >
                  {item.description}
                </CardItem>
                <CardItem translateZ={100} className="w-full mt-4">
                  <img
                    src={item.imgPath}
                    height="1000"
                    width="1000"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="thumbnail"
                  />
                </CardItem>
                <div className="flex justify-between items-center mt-10">
                  <CardItem
                    translateZ={20}
                    as={Link}
                    to="https://twitter.com/mannupaaji"
                    target="__blank"
                    className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
                  >
                    {item.linkText}
                  </CardItem>
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="ease-in-out duration-500 border rounded-full capitalize font-semibold border-teal px-5 py-3 bg-teal hover:bg-white hover:text-teal text-white text-xs"
                  >
                    {item.btnText}
                  </CardItem>
                </div>
              </CardBody>
            </CardContainer>
          ))
        }
      </div>
    </div>
  );
}
