<?php

// src/Controller/ContactController.php
namespace App\Controller;

use App\Entity\Contact;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ContactController extends AbstractController
{
    #[Route('/api/contacts', methods: ['GET'])]
    public function getContacts(EntityManagerInterface $em, SerializerInterface $serializer): JsonResponse
    {
        $contacts = $em->getRepository(Contact::class)->findAll();
        return new JsonResponse($serializer->serialize($contacts, 'json'), 200, [], true);
    }

    #[Route('/api/contact', methods: ['POST'])]
    public function createContact(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $contact = new Contact();
        $contact->setPrenom($data['prenom']);
        $contact->setNom(strtoupper($data['nom'])); // Nom en majuscules
        $contact->setEmail($data['email']);
        $contact->setTelephone($data['telephone']);
        $contact->setVille($data['ville']);

        $em->persist($contact);
        $em->flush();

        return new JsonResponse(['status' => 'Contact created!'], 201);
    }

    #[Route('/api/contact/{id}', methods: ['PUT'])]
    public function updateContact(Request $request, EntityManagerInterface $em, int $id): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $contact = $em->getRepository(Contact::class)->find($id);

        if (!$contact) {
            return new JsonResponse(['error' => 'Contact not found'], 404);
        }

        $contact->setPrenom($data['prenom'] ?? $contact->getPrenom());
        $contact->setNom(isset($data['nom']) ? strtoupper($data['nom']) : $contact->getNom());
        $contact->setEmail($data['email'] ?? $contact->getEmail());
        $contact->setTelephone($data['telephone'] ?? $contact->getTelephone());
        $contact->setVille($data['ville'] ?? $contact->getVille());

        $em->flush();

        return new JsonResponse(['status' => 'Contact updated!'], 200);
    }

    #[Route('/api/contact/{id}', methods: ['DELETE'])]
    public function deleteContact(EntityManagerInterface $em, int $id): JsonResponse
    {
        $contact = $em->getRepository(Contact::class)->find($id);

        if (!$contact) {
            return new JsonResponse(['error' => 'Contact not found'], 404);
        }

        $em->remove($contact);
        $em->flush();

        return new JsonResponse(['status' => 'Contact deleted!'], 200);
    }
}