from django.shortcuts import render
from django.http import JsonResponse
import json

def home(request):
    """Main homepage with dynamic 3D animations and IT services showcase"""
    services = {
        'infrastructure': {
            'title': 'Enterprise Infrastructure Solutions',
            'icon': 'fas fa-server',
            'description': 'Data center design, server optimization, and enterprise storage solutions',
            'subservices': [
                'Data Center Design and Implementation',
                'Enterprise Storage Solutions', 
                'Virtualization and Containerization'
            ]
        },
        'network': {
            'title': 'Network Architecture & Management',
            'icon': 'fas fa-network-wired',
            'description': 'Enterprise network design, SDN, and telecommunications integration',
            'subservices': [
                'Enterprise Network Design',
                'Telecommunications Integration',
                'Network Security Infrastructure'
            ]
        },
        'software': {
            'title': 'Software Engineering & Development',
            'icon': 'fas fa-code',
            'description': 'Custom applications, DevOps, and enterprise system development',
            'subservices': [
                'Custom Application Development',
                'DevOps and CI/CD Implementation',
                'Integration and Middleware Solutions'
            ]
        },
        'cybersecurity': {
            'title': 'Advanced Cybersecurity Services',
            'icon': 'fas fa-shield-alt',
            'description': '24/7 SOC, threat hunting, and comprehensive security management',
            'subservices': [
                'Security Operations Center (SOC)',
                'Vulnerability Management',
                'Compliance and Governance'
            ]
        },
        'cloud': {
            'title': 'Cloud & Digital Transformation',
            'icon': 'fas fa-cloud',
            'description': 'Multi-cloud strategy, digital workplace, and data migration',
            'subservices': [
                'Multi-Cloud Strategy and Management',
                'Digital Workplace Solutions',
                'Data Migration and Integration'
            ]
        },
        'analytics': {
            'title': 'Data Analytics & Business Intelligence',
            'icon': 'fas fa-chart-line',
            'description': 'Advanced analytics, ML/AI, and data governance solutions',
            'subservices': [
                'Advanced Analytics Implementation',
                'Data Governance and Management'
            ]
        },
        'emerging': {
            'title': 'Emerging Technologies',
            'icon': 'fas fa-robot',
            'description': 'IoT, blockchain, AI/ML, and cutting-edge technology solutions',
            'subservices': [
                'Internet of Things (IoT) Solutions',
                'Blockchain and Distributed Ledger Technology',
                'Artificial Intelligence and Machine Learning'
            ]
        },
        'continuity': {
            'title': 'Business Continuity & Disaster Recovery',
            'icon': 'fas fa-life-ring',
            'description': 'Comprehensive BCP, disaster recovery, and backup solutions',
            'subservices': [
                'Comprehensive BCP Development',
                'Backup and Recovery Solutions'
            ]
        }
    }
    
    context = {
        'services': services,
        'company_name': 'GlobalTech',
        'tagline': 'Innovative IT Solutions for the Digital Future'
    }
    
    return render(request, 'core/home.html', context)

def services_api(request):
    """API endpoint for dynamic service loading"""
    if request.method == 'GET':
        service_type = request.GET.get('type', 'all')
        # Return filtered services based on type
        return JsonResponse({'status': 'success', 'services': []})
    
def contact(request):
    """Contact page"""
    return render(request, 'core/contact.html')

def about(request):
    """About page"""
    return render(request, 'core/about.html')
