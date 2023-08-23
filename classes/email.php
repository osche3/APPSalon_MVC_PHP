<?php
    namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

    class Email{

        public $email;
        public $nombre;
        public $token;
        public function __construct($email,$nombre,$token)
        {
            $this->email = $email;
            $this->nombre = $nombre;
            $this->token = $token;

        }
        public function enviarConfirmacion(){

            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = $_ENV['EMAIL_HOST'];
            $mail->SMTPAuth = true;
            $mail->Port =  $_ENV['EMAIL_PORT'];
            $mail->Username =  $_ENV['EMAIL_USER'];
            $mail->Password =  $_ENV['EMAIL_PASS'];

            $mail-> setFrom('cuentas@appsalon.com');
            $mail->addAddress('cuentas@appsalon.com','appsalon.com');
            $mail-> Subject = 'Confirma tu cuenta';

            $mail-> isHTML(TRUE);
            $mail->Charset = 'UTF-8';

            $contenido = "<HTML>";
            $contenido .= "<p><strong>Hola ". $this->nombre . "</strong> Has creado tu cuenta en App salon, solo debes confirmarla presionando el siguiente enlace</p>";
            $contenido .= "<p>Presiona aquí:<a href='" . $_ENV['APP_URL'] . "/confirmarCuenta?token=" . $this->token . "'>Confirmar Cuenta </a> </p>";
            $contenido .= "<p>Si tu no solicitaste esta cuenta , puedes ignorar el mensaje</p>";
            $contenido .= "</HTML>";
            $mail->Body = $contenido;
      
            $mail->send();
        }

        public function enviarInstrucciones(){

            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->Host = $_ENV['EMAIL_HOST'];
            $mail->SMTPAuth = true;
            $mail->Port =  $_ENV['EMAIL_PORT'];
            $mail->Username =  $_ENV['EMAIL_USER'];
            $mail->Password =  $_ENV['EMAIL_PASS'];

            $mail-> setFrom('cuentas@appsalon.com');
            $mail->addAddress('cuentas@appsalon.com','appsalon.com');
            $mail-> Subject = 'Restablece tu password';

            $mail-> isHTML(TRUE);
            $mail->Charset = 'UTF-8';

            $contenido = "<HTML>";
            $contenido .= "<p><strong>Hola ". $this->nombre . "</strong> Has solicitado el siguiente password recuperala presionando el siguiente enlace</p>";
            $contenido .= "<p>Presiona aquí:<a href='" . $_ENV['APP_URL'] . "/recuperar?token=" . $this->token . "'>Reestablecer Password </a> </p>";
            $contenido .= "<p>Si tu no solicitaste esta cuenta , puedes ignorar el mensaje</p>";
            $contenido .= "</HTML>";
            $mail->Body = $contenido;
      
            $mail->send();
        }
    }

?>
