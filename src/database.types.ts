export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Image: {
        Row: {
          alt: string
          id: string
          src: string
        }
        Insert: {
          alt: string
          id: string
          src: string
        }
        Update: {
          alt?: string
          id?: string
          src?: string
        }
        Relationships: []
      }
      Project: {
        Row: {
          categoryId: string
          demo: string
          description: string
          github: string
          id: string
          imageId: string | null
          order: number
          title: string
        }
        Insert: {
          categoryId: string
          demo: string
          description: string
          github: string
          id: string
          imageId?: string | null
          order: number
          title: string
        }
        Update: {
          categoryId?: string
          demo?: string
          description?: string
          github?: string
          id?: string
          imageId?: string | null
          order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "Project_categoryId_fkey"
            columns: ["categoryId"]
            isOneToOne: false
            referencedRelation: "ProjectCategory"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Project_imageId_fkey"
            columns: ["imageId"]
            isOneToOne: false
            referencedRelation: "Image"
            referencedColumns: ["id"]
          }
        ]
      }
      ProjectCategory: {
        Row: {
          description: string
          id: string
          numProjects: number
          order: number
          sortedBy: string
          title: string
        }
        Insert: {
          description: string
          id: string
          numProjects: number
          order: number
          sortedBy: string
          title: string
        }
        Update: {
          description?: string
          id?: string
          numProjects?: number
          order?: number
          sortedBy?: string
          title?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
