<?php

/* calls the methods to display */

// No direct access to this file
defined('_JEXEC') or die('Restricted access');

// import joomla controller library
jimport('joomla.application.component.controller');


 
// Get an instance of the controller prefixed by HelloWorld
$controller = JController::getInstance('SfuFiles');
 

// Perform the Request task
$input = JFactory::getApplication()->input;
$controller->execute($input->getCmd('task'));

$answer = $controller->getanswer();
 
// Redirect if set by the controller
$controller->redirect();



