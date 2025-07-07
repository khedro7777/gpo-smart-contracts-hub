
import { useState, useEffect } from 'react';

interface Group {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

interface Contract {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

interface RFQ {
  id: string;
  title: string;
  description: string;
  status: string;
  deadline: string;
}

export const useSupplierData = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [rfqs, setRfqs] = useState<RFQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setLoading(true);
      
      // Mock data
      setTimeout(() => {
        setGroups([
          {
            id: '1',
            name: 'مجموعة المشتريات الرئيسية',
            description: 'مجموعة للمشتريات الحكومية',
            type: 'procurement',
            status: 'active'
          }
        ]);
        
        setContracts([
          {
            id: '1',
            title: 'عقد توريد معدات تقنية',
            status: 'active',
            created_at: new Date().toISOString()
          }
        ]);
        
        setRfqs([
          {
            id: '1',
            title: 'طلب عروض لتوريد أجهزة كمبيوتر',
            description: 'نحتاج إلى 100 جهاز كمبيوتر للمكاتب',
            status: 'pending',
            deadline: '2024-02-01'
          }
        ]);
        
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  return {
    groups,
    contracts,
    rfqs,
    loading
  };
};
