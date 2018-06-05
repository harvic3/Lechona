import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class Intructions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: this.props.showModal
    };
  }

  toggle = () => {
    this.setState({showModal: !this.state.showModal})
  }

  render() {
    return (
      <div>
        <Button className="btn-instructions" color="warning" size="lg" onClick={this.toggle}>Instrucciones</Button>        
        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
        >
          <ModalHeader toggle={this.toggle}> <h4>Intrucciones</h4></ModalHeader>
          <ModalBody>
          <h5>Bienvenido a <b>"#LaVotadera"</b> de tiempo!!</h5>
            <p>
              A continuación, encontrarás las instrucciones, aunque si quieres puedes probar suerte sin leer nada.
            </p> 
            <p>
              La idea es hacer que tu candidato gane, ante ese deseo se va a interponer la <b>Fotocopiaduría Nacional</b> del estado civil de Colombia 
              haciendo trampas para evitar que tu candidato salga con la mayor cantidad de votos. 
            </p>
            <p>
              Primero debes seleccionar tu candidato, luego en el campo para votos debes poner una cifra desde 1 hasta 100.000 y posteriormente 
              presionar el botón votar. (Puedes cambiarla cuantas veces quieras)
            </p>
            <p>
              En cada votación tuya la Fotocopiaduría le podrá asignar a los demás candidatos desde uno hasta el doble de votos de los que le asignaste a tu candidato.
            </p>
            <p>
              La aplicación cuenta con <b>6 comodines</b> de un solo uso, y son unos números especiales, tres de ellos son de 5 dígitos y están relacionados directamente con las 
              elecciones de la primera vuelta. Los otros tres son de 4 dígitos y representan fechas especiales para <b>la democracia de Colombia</b> .
              Los comodines funcionan mejor al principio pues te pueden ayudar a tomar la delantera y una vez se use un comodín ya no funcionará de nuevo.
            </p>
            <p>
              La aplicación también cuenta con una función que premia tu suerte (si la tienes) pero debes poner mucha atención a los cambios en 
              cada votación porque habrá una señal en los números que te indicará que es el momento para aprovechar esa ventaja, pero si no la aprovechas, 
              deberás esperar hasta otra oportunidad.
            </p>
            <p>
              Pd: los <b>números primos</b> pueden ser tu mejor amigo en ciertos momentos, pero ese momento es el que tú debes descubrir.
            </p>
            <p>Cuando termines monta tu Print Screen en redes con el Hashtag <b>#LaVotadera</b>... Suerte con tu candidato!! :)  </p>
            <p>
              Esta vaina se ve mejor con la fuente oficial. <a href="http://2ttf.com/download/DVb26GzXk0k" > La Descargas desde aquí!!</a>
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              De acuerdo
            </Button>{" "}            
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default Intructions;
